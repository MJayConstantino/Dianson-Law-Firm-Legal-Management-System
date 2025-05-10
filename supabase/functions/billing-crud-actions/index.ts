import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "jsr:@supabase/supabase-js@2";

const supUrl = Deno.env.get("_SUPABASE_URL");
const supKey = Deno.env.get("_SUPABASE_SERVICE_KEY");
const supabase = createClient(supUrl, supKey);

async function cleanupTestCases(affectedIds: string[], table: string, otherTable: string) {
  try {
    const { error1 } = await supabase
    .from(otherTable)
    .delete()
    .in("matter_id", affectedIds);

    const { error2 } = await supabase
      .from(table)
      .delete()
      .in("bill_id", affectedIds);

    if (error1 || error2) throw (`${error1} --||-- ${error2}`);
    console.log(`Successfully cleaned up rows in table: ${table} and ${otherTable}`);
  } catch (error) {
    console.error(`Error cleaning up rows in table: ${table} and ${otherTable}`, error.message);
  }
}

console.log("Hello from billings-table-api-tests!");

Deno.serve(async (req)=>{
  const { action, data, bill_id, table, otherTable, matter_id, matterData } = await req.json().catch(()=>({}));
  const defaultTable = "billings";
  const matterTable = "matters"

  // Authorization
  const authHeader = req.headers.get("Authorization");
  if (!authHeader || authHeader !== `Bearer ${Deno.env.get("_USER_CRUD_TOKEN")}`) {
    return new Response(JSON.stringify({code: 401, message: "Missing or invalid authorization header"}), {
      headers: {"Content-Type": "application/json"},
      status: 401
    });
  }
  try {
    // CLEAN_UP
    if (action === "CLEAN_UP") {
      if (!bill_id || !Array.isArray(bill_id)) {
        return new Response(JSON.stringify({status: 400, error: "Invalid or missing bill_id array"}), {
          headers: {"Content-Type": "application/json"},
          status: 400
        });
      }

      if (!matter_id || !Array.isArray(matter_id)) {
        return new Response(JSON.stringify({status: 400, error: "Invalid or missing matter_id array"}), {
          headers: {"Content-Type": "application/json"},
          status: 400
        });
      }

      if (!table || !otherTable) {
        return new Response(JSON.stringify({status: 400, error: "Missing table name"}), {
          headers: {"Content-Type": "application/json"},
          status: 400
        });
      }
      await cleanupTestCases(bill_id, table, otherTable);
      return new Response(JSON.stringify({
        status: 200,
        message: "Test Cases Cleared Successfully"
      }), {
        headers: {
          "Content-Type": "application/json"
        },
        status: 200
      });
    }

    // GET_ALL
    if (action === "GET_ALL") {
      const { data: bills, error } = await supabase
        .from(defaultTable)
        .select("*");

      if (error) throw error;
      return new Response(JSON.stringify({status: 200, data: bills}), {
        headers: {"Content-Type": "application/json"},
        status: 200
      });
    }

    // GET_ONE
    if (action === "GET_ONE") {
      const { data: item, error } = await supabase
        .from(defaultTable)
        .select("*")
        .eq("bill_id", bill_id)
        .single();

      if (error || !item) {
        return new Response(JSON.stringify({status: 404, error: "Bill not found", data: null}), {
          headers: {"Content-Type": "application/json"},
          status: 404
        });
      }
      return new Response(JSON.stringify({status: 200, data: item}), {
        headers: {"Content-Type": "application/json"},
        status: 200
      });
    }

    // Get Bills by matter_id
    if (action === "GET_BILLS_BY_MATTER_ID") {
      if (!matter_id) {
        return new Response(JSON.stringify({status: 400, error: "Missing or invalid matter_id"}), {
          headers: {"Content-Type": "application/json"},
          status: 400
        });
      }
      const { data: bills, error } = await supabase
        .from(defaultTable)
        .select("*")
        .eq("matter_id", matter_id);
        
      if (error || !bills || bills.length === 0) {
        return new Response(JSON.stringify({status: 404, error: "Bills not found"}), {
          headers: {"Content-Type": "application/json"},
          status: 404
        });
      }
      return new Response(JSON.stringify({status: 200,data: bills}), {
        headers: {"Content-Type": "application/json"},
        status: 200
      });
    }
    
    // POST (Create Bill)
    if (action === "POST") {
      const { matterData: matterInserted, error: matterError} = await supabase
        .from(matterTable)
        .insert(matterData)
        .select("matter_id")

      if (matterError) {
        throw new Error("Failed to insert matter: " + (matterError?.message ?? "Unknown error"));
      }

      data.matter_id = matterData.matter_id;


      const { data: inserted, error } = await supabase
        .from(defaultTable)
        .insert(data)
        .select("*");

      if (error) throw new Error("Internal Server Error: " + error.message);

      return new Response(JSON.stringify({ status: 201, matterData: matterInserted, data: inserted}), {
        headers: { "Content-Type": "application/json" },
        status: 201,
      });
    }


    // UPDATE (Update Bill)
    if (action === "UPDATE_ONE") {
      const { data: updated, error } = await supabase
      .from(defaultTable)
      .update(data)
      .eq("bill_id", bill_id)
      .select("*");

      if (error) throw new Error("Internal Server Error: " + error.message);

      if (!updated || updated.length === 0) {
        return new Response(JSON.stringify({status: 404, error: "Bill not found"}), {
          headers: {"Content-Type": "application/json"},
          status: 404
        });
      }

      return new Response(JSON.stringify({
        status: 200,
        data: updated
      }), {
        headers: {
          "Content-Type": "application/json"
        },
        status: 200
      });
    }


    // DELETE
    if (action === "DELETE_ONE") {
      const { matterData: matterDeleted, error: matterError } = await supabase
        .from(matterTable)
        .delete()
        .eq("matter_id", matter_id)
        .select("*");


      const { data: deleted, error } = await supabase
        .from(defaultTable)
        .delete()
        .eq("bill_id", bill_id)
        .select("*");
  
      if (error) throw new Error("Internal Server Error: " + error.message);
      if (error) throw new Error("Internal Server Error: " + matterError.message);

      if (!deleted) {
        return new Response(JSON.stringify({status: 404, error: "Bill not found"}), {
          headers: {"Content-Type": "application/json"},
          status: 404
        });
      }

      return new Response(JSON.stringify({status: 200, matterData: matterDeleted, data: deleted}), {
        headers: {"Content-Type": "application/json"},
        status: 200
      });
    }


    if (action === "RUN_TESTS") {
      const affectedIds: string[] = [];
      const mockMatter = {
        matter_id: "07a9d0e8-d00e-4f69-a9e0-8c81755ebf10",
        name: "NYC Arson Case",
        client: "Jane Doe",
        status: "open",
        created_at: "2025-01-01T00:00:00.000Z",
        date_opened: "2025-01-02T00:00:00.000Z",
        description: "Criminal case on an arson case.",
        case_number: "CN-112"
        
      }
      const mockBill = {
        bill_id: "f9caaaa8-2e0a-4164-8331-a907ca7dc878",
        matter_id: mockMatter.matter_id,
        name: "Court appearance – Preliminary Conference",
        amount: 12000,
        created_at: "2025-01-01T00:00:00.000Z",
        status: "active",
        remarks: "3,000/hr at 4 hrs. Down payment - 6500."
      };

      // INSERT
      const { data: matterInserted, error: matterInsertError } = await supabase
        .from(matterTable)
        .insert(mockMatter)
        .select("*");

      const { data: inserted, error: insertError } = await supabase
        .from(defaultTable)
        .insert(mockBill)
        .select("*");

      if (insertError) 
        throw new Error("Insert Test Error: " + insertError.message);
      if (matterInsertError) 
        throw new Error("Insert Test Error: " + matterInsertError.message);

      const insertedId = inserted[0].bill_id;
      const matterInsertedId = matterInserted[0].matter_id

      affectedIds.push(insertedId, matterInserted);

      // GET_ONE
      const { error: selectOneError } = await supabase
        .from(defaultTable) 
        .select("*")
        .eq("bill_id", insertedId)
        .single();

      if (selectOneError) 
        throw new Error("Select Test Error: " + selectOneError.message);


      // UPDATE_ONE
      const { error: updateError } = await supabase
        .from(defaultTable)
        .update({
          name: "(Updated) Preliminary Conference",
          status: "paid",
        })
        .eq("bill_id", insertedId);

      if (updateError) throw new Error("Update Test Error: " + updateError.message);


      // DELETE_ONE
      const { error: deleteError } = await supabase
        .from(defaultTable)
        .delete()
        .eq("bill_id", insertedId);

        const { error: matterDeleteError } = await supabase
        .from(matterTable)
        .delete()
        .eq("matter_id", matterInsertedId);

      if (deleteError) throw new Error("Delete Test Error: " + matterDeleteError.message);
      if (deleteError) throw new Error("Delete Test Error: " + deleteError.message);



      // CLEANUP
      await cleanupTestCases(affectedIds, defaultTable, matterTable);
      return new Response("All test cases executed and cleaned up successfully.");
    }


    return new Response(JSON.stringify({
      status: 400,
      error: "Invalid action provided"
    }), {
      headers: {
        "Content-Type": "application/json"
      },
      status: 400
    });
  } catch (error) {
    console.error("General Error:", error);
    return new Response(JSON.stringify({
      status: 500,
      error: error.message
    }), {
      headers: {
        "Content-Type": "application/json"
      },
      status: 500
    });
  }
});
